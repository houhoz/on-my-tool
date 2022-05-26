import { useEffect, useState } from 'react';
import { Button, message, List } from 'antd';
import {
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';
import { readText, writeText } from '@tauri-apps/api/clipboard';
import Cron from 'croner';
import img from '@/assets/sport.jpeg';
import styles from './index.less';

export default function IndexPage() {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    const clipboardJson = localStorage.getItem('clipboard') || '';
    setList(JSON.parse(clipboardJson));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      readText().then((text: any) => {
        const firstText = list[0];
        if (isDiffText(firstText, text)) {
          setList([text, ...list]);
          const clipboard = JSON.stringify([text, ...list]);
          localStorage.setItem('clipboard', clipboard);
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [list]);

  /**
   * 判断内容是否不一致
   * @param beforeText
   * @param afterText
   * @returns
   */
  function isDiffText(beforeText: string, afterText: string): boolean {
    return beforeText !== afterText;
  }

  function send() {
    Cron('0 30 10-19 * * 1-5', function () {
      // 周一到周五10-18点
      sendNotification({
        body: '工作一小时了，起来休息一下！',
        icon: img,
        title: '健康工作',
      });
    });
    message.success('提醒成功');
  }
  function handleClick() {
    requestPermission().then((res) => {
      console.log('res', res);
    });
  }
  function setClipboard(text: string) {
    writeText(text).then(() => {
      message.success('复制成功');
    });
  }
  return (
    <div>
      <h1 className={styles.title}>健康工作提醒</h1>
      <img src={img} alt="" />
      <Button onClick={handleClick}>获取权限</Button>
      <Button onClick={send}>开始提醒</Button>
      <List
        size="small"
        header="剪贴板内容"
        footer={null}
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <div>
              <span>{item}</span>
              <Button onClick={() => setClipboard(item)}>复制</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
