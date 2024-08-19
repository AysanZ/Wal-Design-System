import clsx from 'clsx';

export const accordionStyles = {
  container: (open: boolean, className?: string) =>
    clsx(
      'rounded-[10px] cursor-pointer group p-[14px]',
      'flex justify-between items-start gap-[10px]',
      open
        ? 'border border-weak-50 dark:border-weak-50-dark bg-weak-50 dark:bg-weak-50-dark'
        : 'border border-soft-200 dark:border-soft-200-dark bg-white-0 dark:bg-white-0-dark',
      !open && 'shadow-[0_1px_2px_0_#0A0D1408]',
      'hover:bg-weak-50 dark:hover:bg-weak-50-dark duration-200 transition-all ease-in',
      className,
    ),
  iconSpan: 'w-5 h-5 flex justify-center items-center relative',
  header: 'w-full flex flex-col justify-start items-start gap-[6px]',
  title: 'break-words whitespace-normal',
  content: (open: boolean) =>
    clsx(
      'overflow-hidden transition-[max-height] duration-200 ease-out',
      open ? 'max-h-[1000px]' : 'max-h-0',
    ),
  contentInner: (open: boolean) =>
    clsx(
      'transition-opacity duration-300 ease-out',
      open ? 'opacity-100' : 'opacity-0',
    ),
  typography:
    'break-words whitespace-normal text-sub-600 dark:text-sub-600-dark',
  iconClass: (isVisible: boolean) =>
    clsx(
      'text-soft-400 dark:text-soft-400-dark',
      'group-hover:text-sub-600 dark:group-hover:text-sub-600-dark',
      'transition-all duration-200',
      isVisible ? 'opacity-100' : 'opacity-0',
      'absolute',
    ),
};
