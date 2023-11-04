import { IProjectComment } from "@/src/commons/types/generated/types";
import CommentItem from "@/src/components/molecules/commentItem";
import EndMessage from "@/src/components/molecules/infiniteScroll/endMessage";
import { Spinner, VStack } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

interface ICommentListProps {
  comments: IProjectComment[];
  onClickDeleteComment: (string) => void;
  fetchMoreComments: () => void;
  hasMoreComments: boolean;
  commentsLoading: boolean;
}
export default function CommentList({
  comments,
  onClickDeleteComment,
  fetchMoreComments,
  hasMoreComments,
  commentsLoading,
}: ICommentListProps) {
  return (
    <InfiniteScroll
      dataLength={comments?.length ?? 0}
      next={fetchMoreComments}
      hasMore={hasMoreComments}
      loader={commentsLoading && <Spinner />}
      endMessage={<EndMessage endMessageOptions="comment" />}
      scrollableTarget="scrollableDiv"
    >
      <VStack gap="1rem">
        {comments.map((comment, i) => (
          <CommentItem
            key={i}
            commentItemData={{
              content: comment.content,
              created_at: comment.created_at,
              maxDonationAmount: comment.maxDonationAmount,
              projectComment_id: comment.projectComment_id,
              user: comment.user,
            }}
            onClickDeleteComment={onClickDeleteComment}
          />
        ))}
      </VStack>
    </InfiniteScroll>
  );
}
