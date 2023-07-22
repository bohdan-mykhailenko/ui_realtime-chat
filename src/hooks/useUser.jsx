import { useState } from 'react';

export const useUser = (user) => {

  const [collections] = useState(
    user
      ?
      (user.uid === '27ofykS3n6hxFTDUzJAOAeIuCj93' ||
        user.uid === 'ccVxAhtSqjnXIxrCTit2R3jjhlao2' ||
        user.uid === 'gZYsZRVXbOMcCVJGRdiJP4bTUoW2' ||
        user.uid === 'lQ8gTXdhvFN7UtS598LLW5walEx2' ||
        user.uid === '27h9xSZ6xQU2SKoHlTs58Jg0UcC3' ||
        user.uid === 'nrKmbtMoJ5RFQUiMkPALm9Uxx6y2')
        ?
        ['messages', 'photos']
        :
        ['messages3', 'photos3']
      :
      []
  )

  return { collections };
}