import { useTranslation } from 'react-i18next';

/**
 * Hook to translate menu items recursively.
 * @param {Array} menu - The menu configuration array.
 * @param {string} namespace - The i18n namespace to use.
 * @returns {Array} - The translated menu array.
 */
export function useMenuTranslation(menu, namespace = 'menuSidebar') {
  const { t } = useTranslation(namespace);

  const translateItems = (items) => {
    if (!items || !Array.isArray(items)) return items;

    return items.map((item) => {
      const translatedItem = {
        ...item,
        title: t(item.title),
      };

      if (item.children) {
        translatedItem.children = translateItems(item.children);
      }

      return translatedItem;
    });
  };

  return translateItems(menu);
}
