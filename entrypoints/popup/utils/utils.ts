/**
 * 获取唯一id
 * @returns
 */
export const getUUid = () => {
  return (Math.random() * Math.random()).toString(36).slice(2, 10);
};

export const copyToClipboard = (str: string) => {
  try {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selection = document.getSelection();
    const selected =
      selection && selection.rangeCount > 0 ? selection?.getRangeAt(0) : false;
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      selection?.removeAllRanges();
      selection?.addRange(selected);
    }
    return success;
  } catch (error) {
    return false;
  }
};
