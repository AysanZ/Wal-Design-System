import { useState, useRef } from 'react';
import { Icon } from '@components/icon';
import { Typography } from '@components/typography';
import { accordionStyles, AccordionProps } from '.';

/**
 * An accordion is a flexible UI element that enhances user experience by organizing
 * content in an accessible, space-saving manner. Frequently used in FAQ sections,
 * product descriptions, or content-heavy pages, accordions allow users to expand
 * or collapse sections, making navigation smoother and more efficient.
 */
export const Accordion: React.FC<AccordionProps> = ({
  flipIcon = false,
  hasIcon,
  title = 'Insert your accordion title here',
  content = 'Insert the accordion description here. It would look better as two lines of text.',
  isOpen = false,
  onToggle = () => {},
  customCollapseIcon,
  customExpandIcon,
  icon,
  className,
}) => {
  const [open, setOpen] = useState(isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    onToggle(!open);
  };

  const renderIcon = (collapse: boolean) => {
    const defaultIcon = collapse ? 'subtract-line' : 'add-line';
    const customIcon = collapse ? customCollapseIcon : customExpandIcon;
    const isVisible = collapse ? open : !open;

    return (
      <Icon
        name={customIcon || defaultIcon}
        className={accordionStyles.iconClass(isVisible)}
        size={20}
      />
    );
  };

  return (
    <section
      className={accordionStyles.container(open, className)}
      onClick={handleToggle}
    >
      {hasIcon && icon && (
        <span className={accordionStyles.iconSpan}>{icon}</span>
      )}

      {!hasIcon && flipIcon && (
        <span className={accordionStyles.iconSpan}>
          {renderIcon(false)}
          {renderIcon(true)}
        </span>
      )}

      <header className={accordionStyles.header}>
        <Typography variant="label-small" className={accordionStyles.title}>
          {title}
        </Typography>
        <div
          ref={contentRef}
          className={accordionStyles.content(open)}
          style={open ? { maxHeight: contentRef.current?.scrollHeight } : {}}
        >
          <div className={accordionStyles.contentInner(open)}>
            <Typography
              variant="paragraph-small"
              className={accordionStyles.typography}
            >
              {content}
            </Typography>
          </div>
        </div>
      </header>

      {(hasIcon || !flipIcon) && (
        <span className={accordionStyles.iconSpan}>
          {renderIcon(false)}
          {renderIcon(true)}
        </span>
      )}
    </section>
  );
};
