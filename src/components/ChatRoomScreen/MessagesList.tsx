import format from 'date-fns/format';
import React from 'react';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useInfiniteScroll } from '../../hooks/use-infinite-scroll';
import { useAdjustedScroll } from '../../hooks/use-adjusted-scroll';

const Container = styled.div`
  position: relative;
  display: block;
  flex: 2;
  overflow-y: overlay;
  padding: 0 15px;
`;

const LoadingMore = styled.div`
  height: 30px;
  line-height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`;

type StyledProp = {
  isMine: any;
};

const MessageItem = styled.div`
  display: inline-block;
  position: relative;
  max-width: 100%;
  border-radius: 7px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  margin-bottom: 10px;
  clear: both;

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 3px;
    width: 12px;
    height: 19px;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  ${(props: StyledProp) =>
    props.isMine
      ? css`
          float: right;
          background-color: #dcf8c6;

          &::before {
            right: -11px;
            background-image: url(/assets/message-mine.png);
          }
        `
      : css`
          float: left;
          background-color: #fff;

          &::before {
            left: -11px;
            background-image: url(/assets/message-other.png);
          }
        `}
`;

const Contents = styled.div`
  padding: 5px 7px;
  word-wrap: break-word;

  &::after {
    content: ' \\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0';
    display: inline;
  }
`;

const Timestamp = styled.div`
  position: absolute;
  bottom: 2px;
  right: 7px;
  color: gray;
  font-size: 12px;
`;

interface Message {
  id: string | null;
  content: string | null;
  createdAt: string | null;
}
interface MessagesListProps {
  messages: Array<Message>;
  loadMore: Function;
  hasMore: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  loadMore,
  hasMore,
}) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const [fetching, stopFetching] = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    ref: selfRef!,
  });
  const adjustScroll = useAdjustedScroll(selfRef);

  useEffect(() => {
    if (!selfRef.current) return;

    if (fetching) {
      stopFetching();
      adjustScroll();
    } else {
      // scroll to the most recent message
      adjustScroll(true);
    }
  }, [messages.length, selfRef, fetching, stopFetching, adjustScroll]);

  return (
    <Container ref={selfRef}>
      {fetching && <LoadingMore>{'Loading more messages...'}</LoadingMore>}
      {messages.map((message: any) => (
        <MessageItem
          data-testid="message-item"
          isMine={message.isMine}
          key={message.id}>
          <Contents data-testid="message-content">{message.content}</Contents>
          <Timestamp data-testid="message-date">
            {format(message.createdAt, 'HH:mm')}
          </Timestamp>
        </MessageItem>
      ))}
    </Container>
  );
};

export default MessagesList;
