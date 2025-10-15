import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import type { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';

interface TabMenuPrimeProps {
  items: MenuItem[];
  activeIndex?: number;
  onTabChange?: (event: { index: number; originalEvent: React.SyntheticEvent }) => void;
  className?: string;
  style?: React.CSSProperties;
  orientation?: 'horizontal' | 'vertical';
  scrollable?: boolean;
}

export const TabMenuPrime: React.FC<TabMenuPrimeProps> = ({
  items,
  activeIndex = 0,
  onTabChange,
  className = '',
  style,
  orientation = 'horizontal',
  scrollable = true
}) => {
  const [activeTab, setActiveTab] = useState(activeIndex);

  const handleTabChange = (event: { index: number; originalEvent: React.SyntheticEvent }) => {
    setActiveTab(event.index);
    onTabChange?.(event);
  };

  const getTabMenuClasses = () => {
    return classNames(
      'tab-menu-prime',
      {
        'tab-menu-vertical': orientation === 'vertical',
        'tab-menu-scrollable': scrollable
      },
      className
    );
  };

  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{
        __html: `
          .tab-menu-prime .p-tabmenu-nav {
            display: flex !important;
            flex-direction: row !important;
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f9fafb !important;
            border-bottom: 1px solid #e5e7eb !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            white-space: nowrap !important;
            width: 100% !important;
          }

          .tab-menu-prime.tab-menu-vertical .p-tabmenu-nav {
            flex-direction: column !important;
            border-bottom: none !important;
            border-right: 1px solid #e5e7eb !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            white-space: normal !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item {
            flex: 0 0 auto !important;
            min-width: 120px !important;
            flex-shrink: 0 !important;
          }

          .tab-menu-prime.tab-menu-vertical .p-tabmenu-nav .p-tabmenu-nav-item {
            flex: none !important;
            width: 100% !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 6px 8px !important;
            text-decoration: none !important;
            color: #6b7280 !important;
            font-weight: 500 !important;
            font-size: 12px !important;
            transition: all 0.2s ease !important;
            border: none !important;
            background: transparent !important;
            width: 100% !important;
            min-height: 28px !important;
            gap: 4px !important;
            white-space: nowrap !important;
          }

          .tab-menu-prime.tab-menu-vertical .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link {
            justify-content: flex-start !important;
            text-align: left !important;
            white-space: normal !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link:hover {
            background-color: #f3f4f6 !important;
            color: #374151 !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item.p-highlight .p-tabmenu-nav-link {
            background-color: #028881 !important;
            color: white !important;
            font-weight: 600 !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item.p-highlight .p-tabmenu-nav-link:hover {
            background-color: #027a73 !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item.p-disabled .p-tabmenu-nav-link {
            color: #9ca3af !important;
            cursor: not-allowed !important;
            opacity: 0.6 !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item.p-disabled .p-tabmenu-nav-link:hover {
            background: transparent !important;
          }

          .tab-menu-prime .p-tabmenu-panel {
            padding: 12px !important;
            background-color: white !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link i {
            font-size: 12px !important;
            line-height: 1 !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link img {
            width: 12px !important;
            height: 12px !important;
            object-fit: contain !important;
          }

          .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link .p-badge {
            margin-left: 4px !important;
            font-size: 12px !important;
            min-width: 12px !important;
            height: 12px !important;
            line-height: 12px !important;
          }

          /* Scrollbar personalizado */
          .tab-menu-prime .p-tabmenu-nav::-webkit-scrollbar {
            height: 6px !important;
          }

          .tab-menu-prime .p-tabmenu-nav::-webkit-scrollbar-track {
            background-color: #f3f4f6 !important;
            border-radius: 3px !important;
          }

          .tab-menu-prime .p-tabmenu-nav::-webkit-scrollbar-thumb {
            background-color: #d1d5db !important;
            border-radius: 3px !important;
          }

          .tab-menu-prime .p-tabmenu-nav::-webkit-scrollbar-thumb:hover {
            background-color: #9ca3af !important;
          }

          /* Responsive Mobile */
          @media (max-width: 640px) {
            .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item {
              min-width: 80px !important;
            }

            .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link {
              padding: 4px 6px !important;
              font-size: 10px !important;
              min-height: 22px !important;
            }

            .tab-menu-prime .p-tabmenu-panel {
              padding: 8px !important;
            }
          }

          /* Responsive Tablet */
          @media (max-width: 768px) {
            .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item {
              min-width: 100px !important;
            }

            .tab-menu-prime .p-tabmenu-nav .p-tabmenu-nav-item .p-tabmenu-nav-link {
              padding: 5px 7px !important;
              font-size: 11px !important;
              min-height: 24px !important;
            }
          }
        `
      }} />
      <TabMenu
        model={items}
        activeIndex={activeTab}
        onTabChange={handleTabChange}
        className={getTabMenuClasses()}
        style={style}
      />
    </div>
  );
};

export default TabMenuPrime;