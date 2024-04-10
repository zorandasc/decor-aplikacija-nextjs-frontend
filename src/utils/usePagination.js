//HELPER HOOK FOR PAGINATIONV2 COMPONENTU
import { useMemo } from "react";

//Array.from(arrayLike, (element, index) => { /* ... */ } )
// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
//  Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4],,
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = "...";

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    //Notice that we are using Math.ceil to round of the number to the next
    //higher integer value. This ensures that we are reserving an extra page
    //for the remaining data.
    const totalPages = Math.ceil(totalCount / pageSize);

    //Ukupan broje ellemenata za prikaz na pageru
    // Pages count is determined as: siblingCount
    // + firstPage + lastPage + currentPage + 2*DOTS
    //npr: [1, ... , 2 , 3, 4 , ... , 50] (ovdije imamo 7 lemenata)
    const totalPageNumbers = siblingCount + 5;

    //Calculate left and right sibling index and make sure they
    //are within range 1 and totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    //We do not show dots just when there is just one page number to
    // be inserted between the EXTREMES of sibling and the page limits
    //i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2
    //and rightSiblingIndex < totalPageCount - 2
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    //polozaj dotsa zavisi od polozaj siblingsa u odnosu na extreme
    //dok polozaj siblingsa zavisi od currentpage

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    //Osim Case 1 U svim ostalim sulacejevima numeracija ce
    //prikazivati: firstPage, currentPage, lastPage + 2dots
    //Sa tim da jedan od dots nece btiti prokazana samo kad
    //su krajne pozije u kojima se nalazi currentPage

    //Case 1
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    //Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    //Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  //trudimo se da paginationRange bude konstantne velicnine
  //npr: za siblingCount=1, ocemo 7 element
  return paginationRange;
};
