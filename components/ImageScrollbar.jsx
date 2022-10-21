import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


const leftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
        <Flex justifyContent={"center"} alignItems="center" marginRight="1">
            <Icon 
                as={FaArrowAltCircleLeft}
                onClick={() => scrollPrev()}
                fontSize="2xl"
                cursor="pointer"
            />

        </Flex>
    )
};

const rightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
        <Flex justifyContent={"center"} alignItems="center" marginRight="1">
            <Icon 
                as={FaArrowAltCircleRight}
                onClick={() => scrollNext()}
                fontSize="2xl"
                cursor="pointer"
            />

        </Flex>
    )
}

const ImageScrollbar = ({ data }) => {
  
    return (
    <ScrollMenu LeftArrow={leftArrow} RightArrow={rightArrow} style={{ overflow: 'hidden'}}>
        {
            data.map((item) => (
                <Box w="910px" key={item.id} itemId={item.id} overflow="hidden" p="1" >
                    <Image 
                        placeholder='blur' 
                        blurDataURL={item.url} 
                        src={item.url} 
                        alt="properties" 
                        width={1000} 
                        height={500} 
                        sizes="(max-width: 500px) 100px, (max-width: 1024px) 400px, 1000px"
                    />
                </Box>
            ))
        }
    </ScrollMenu>
  )
}

export default ImageScrollbar;