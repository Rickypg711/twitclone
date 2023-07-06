import { z } from "zod";
import { Prisma } from '@prisma/client';

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";



interface UserResponse {
  name: string;
  id: string;
  image: string | null;
}

interface TweetResponse {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  user: UserResponse;
  likedByMe: boolean;
}

interface InfiniteFeedResponse {
  tweets: TweetResponse[];
  nextCursor: { id: string; createdAt: Date } | null;

}

type TweetQueryResult = {
  id: string;
  content: string;
  createdAt: Date;
  _count: { likes: number };
  likes: { userId: string; tweetId: string }[];
  user: { name: string | null; id: string; image: string | null };
};




export const tweetRouter = createTRPCRouter({
  infiniteFeed: publicProcedure.input(z.object({
    limit: z.number().optional(), 
    cursor: z.object({id: z.string(), 
      createdAt: z.date()}).optional()}))
      .query(async ({input: {limit = 10, cursor}, ctx}) => {
const currentUserId = ctx.session?.user.id

const tweets = await
        ctx.prisma.tweet.findMany({
          take: limit + 1,
          cursor: cursor ? {createdAt_id: cursor} : undefined,
          orderBy: [{createdAt: 'desc'}, {id: 'desc'}],
          select: {
            id:true,
            content: true,
            createdAt: true,
            _count: {select: { likes: true}},
            likes:currentUserId == null ? false  : {where : {userId: currentUserId}},
            user: {
              select: {name: true, id: true, image:true}
            }
          }
        })

        let nextCursor: typeof cursor | undefined
        if(tweets.length > limit ){
          const nextItem = tweets.pop()
          if (nextItem != null){
            nextCursor = {id: nextItem.id, createdAt: nextItem.createdAt}
          }

        
        }

        return {
          tweets : tweets.map((tweet: TweetQueryResult) => {
            return {
              id: tweet.id,
              content: tweet.content,
              createdAt: tweet.createdAt,
              likeCount: tweet._count.likes,
              user: tweet.user,
              likedByMe: tweet.likes?.length > 0,
            }
          }), nextCursor
        }
        
      }),
         
     
         
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
   .mutation(async ({input: {content}, ctx}) => {
   const tweet =   await ctx.prisma.tweet.create({
     data: {content, userId:ctx.session.user.id },
    });

    return tweet
   }),

  });    