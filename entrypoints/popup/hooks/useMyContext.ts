import { ALLOWDOMAINLIST } from '@/contants';
import { useState, useEffect } from 'react';
import { Tabs } from 'wxt/browser';

export interface AllowListItem {
  id: string;
  createdTime: number;
  value: string;
}

const useMyContext = () => {
  const [domain, setDomain] = useState('');
  const [currentTab, setCurrentTab] = useState<Tabs.Tab | null>(null);
  const [allowList, setAllowList] = useState<AllowListItem[]>([]);

  /**
   * 初始化当前tab的信息
   */
  const initTabInfo = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const currentTab = tabs[0]; // 获取当前活动标签页
    const url = new URL(currentTab.url!); // 解析 URL
    setCurrentTab(currentTab);
    setDomain(url.hostname);
  };

  useEffect(() => {
    initTabInfo();
  }, []);

  /**
   * 改变允许运行的网站信息
   * @param list
   */
  const changeAllowList = (list: AllowListItem[]) => {
    setAllowList(list);
  };

  /**获取允许运行的列表 */
  const getAllowList = async () => {
    const _list =
      (await storage.getItem<AllowListItem[]>(ALLOWDOMAINLIST)) || [];
    setAllowList(_list);
    return _list;
  };

  return { domain, currentTab, allowList, changeAllowList, getAllowList };
};

export default useMyContext;
