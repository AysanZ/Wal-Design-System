import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Figma → "❖ Video Player" page.
 *   Player   → Size (Large | Medium), State (Idle · Playing · Paused · Loading)
 *   Controls → Play/Pause · Timeline · Time · Volume · Fullscreen
 *
 * State is not a prop: every one of those four is something the `<video>`
 * element already knows and reports through its events. A `state="playing"`
 * prop would be a second source of truth that drifts from the media the moment
 * the user pauses from the keyboard.
 */
export const videoPlayerVariants = cva(
  [
    'group/player relative w-full overflow-hidden rounded-xl bg-static-black',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-base',
  ],
  {
    variants: {
      ratio: {
        '16/9': 'aspect-video',
        '4/3': 'aspect-4/3',
        '1/1': 'aspect-square',
        auto: '',
      },
    },
    defaultVariants: { ratio: '16/9' },
  },
);

export const videoElementVariants = cva(
  'size-full bg-static-black object-contain',
);

/**
 * The control bar. It fades out while the video plays and comes back on hover
 * or on focus — `focus-within` is the part that matters: a bar that only
 * responds to a pointer disappears permanently for a keyboard user mid-Tab.
 */
export const videoControlsVariants = cva(
  [
    'absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3',
    'bg-[linear-gradient(to_top,rgba(0,0,0,0.72),transparent)]',
    'transition-opacity duration-200 motion-reduce:transition-none',
    'group-hover/player:opacity-100 group-focus-within/player:opacity-100',
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: { visible: true },
  },
);

export const videoButtonVariants = cva(
  [
    'grid shrink-0 place-items-center rounded-lg text-static-white',
    'cursor-pointer transition-colors duration-150',
    'hover:bg-white-alpha-16',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-static-white',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'size-8 [&_svg]:size-4',
        md: 'size-9 [&_svg]:size-5',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** The big play affordance over the poster. */
export const videoOverlayButtonVariants = cva([
  'absolute inset-0 m-auto grid size-16 place-items-center rounded-full',
  'bg-black-alpha-24 text-static-white backdrop-blur-sm',
  'cursor-pointer transition-transform duration-150 hover:scale-105',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-static-white',
  '[&_svg]:size-8',
]);

export const videoTimeVariants = cva(
  'shrink-0 select-none font-mono text-[12px] leading-4 tabular-nums text-static-white',
);

export type VideoPlayerVariantProps = VariantProps<typeof videoPlayerVariants>;
