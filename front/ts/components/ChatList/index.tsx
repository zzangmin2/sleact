import React, { RefObject, VFC, forwardRef, useCallback } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { IDM } from '@typings/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: IDM[] };
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
  isReachingEnd: boolean;
  scrollRef: RefObject<Scrollbars>;
}
const ChatList: VFC<Props> = ({ chatSections, setSize, scrollRef, isReachingEnd }) => {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      // 여기에서 데이터 추가 로딩 또는 필요한 작업을 수행
      setSize((prevSize) => prevSize + 1).then(() => {
        //스크롤 위치 유지
        if (scrollRef?.current) {
          scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
        }
      });
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => {
                return <Chat key={chat.id} data={chat} />;
              })}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
