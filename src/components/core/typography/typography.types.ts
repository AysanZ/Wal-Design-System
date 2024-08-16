export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label-xlarge'
    | 'label-large'
    | 'label-medium'
    | 'label-small'
    | 'label-xsmall'
    | 'paragraph-xlarge'
    | 'paragraph-large'
    | 'paragraph-medium'
    | 'paragraph-small'
    | 'paragraph-xsmall'
    | 'subheading-medium'
    | 'subheading-small'
    | 'subheading-xsmall'
    | 'subheading-2xsmall'
    | 'docs-label'
    | 'docs-paragraph';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  fontsize?: number;
  fontFamily?: string;
  lineHeight?: string;
  dir?: 'ltr' | 'rtl';
}
