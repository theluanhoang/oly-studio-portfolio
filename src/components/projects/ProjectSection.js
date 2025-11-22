import ProjectImage from './ProjectImage';

const getGridPosition = (isLayout1, imageIndex) => {
  if (isLayout1) {
    if (imageIndex === 0) return 'row-span-2 col-span-3 row-start-1 col-start-1';
    if (imageIndex === 1) return 'row-span-3 col-span-2 row-start-1 col-start-4';
    if (imageIndex === 2) return 'row-span-3 col-span-3 row-start-3 col-start-1';
    return 'row-span-2 col-span-2 row-start-4 col-start-4';
  } else {
    if (imageIndex === 0) return 'row-span-2 col-span-2 row-start-1 col-start-1';
    if (imageIndex === 1) return 'row-span-3 col-span-3 row-start-1 col-start-3';
    if (imageIndex === 2) return 'row-span-3 col-span-2 row-start-3 col-start-1';
    return 'row-span-2 col-span-3 row-start-4 col-start-3';
  }
};

export default function ProjectSection({ images, sectionIndex }) {
  const isLayout1 = sectionIndex % 2 === 0;

  return (
    <div
      className="section w-[610px] h-[610px] relative grid grid-cols-5 grid-rows-5 gap-[10px] shrink-0 md:w-[90vw] md:h-[90vw] md:max-w-[610px] md:max-h-[610px]"
    >
      {images.map((image, imageIndex) => (
        <ProjectImage
          key={imageIndex}
          src={image.src}
          alt={image.alt}
          gridPosition={getGridPosition(isLayout1, imageIndex)}
          slug={image.slug}
        />
      ))}
    </div>
  );
}

