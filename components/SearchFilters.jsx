import { useEffect, useState } from 'react';
import { Box, Flex, Select, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter} from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import { fetchApi, baseUrl } from '../utils/fetchApi';

import NoResult from '../assets/images/noresult.svg';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const [showLocations, setShowLocations] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ locationData, setLocationData ] = useState();
    const router = useRouter();

    // function to update the filters state, we do that by updating the url
    const searchProperties = (filterValues) => {
        // we do that by updating the url
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        // loop over each of the values
        values.forEach((item) => {
            // update the query value && make sure their is a value
            if(item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        });

        // we add the query to the url
        router.push({ pathname: path, query});
    }

    const handleLocation = (externalID, locationName) => {
        searchProperties({ locationExternalIDs: externalID});
        setShowLocations(false);
        setSearchTerm(locationName);
    }

    useEffect(() => {
        if(searchTerm !== ''){
            const fetchData = async() => {
                setLoading(true);
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLoading(false);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm])

    return (
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {
                filters.map((filter) => (
                    <Box key={filter.queryName}>
                        <Select 
                            placeholder={filter.placeholder}
                            w="fit-content"
                            p="2"
                            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                        >
                            {
                                filter?.items?.map((item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </Select>
                    </Box>
                ))
            }
            <Flex flexDir="column">
                <Button onClick={() => setShowLocations(!showLocations)} border="1px" borderColor="blue.400" marginTop="2">
                    Search Location
                </Button>
                {
                    showLocations && (
                        <Flex flexDir="column" pos="relative" paddingTop="2">
                            <Input 
                                placeholder='Type Here'
                                value={searchTerm}
                                w='300px'
                                focusBorderColor="gray.300"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {
                                searchTerm !== '' && (
                                    <Icon 
                                        as={MdCancel}
                                        pos="absolute"
                                        cursor="pointer"
                                        right="5"
                                        top="5"
                                        zIndex="100"
                                        onClick={() => setSearchTerm('')}
                                    />
                                )
                            }

                            {
                                loading && <Spinner margin="auto" marginTop="3" />
                            }
                            {
                                showLocations && (
                                    <Box height="300px" overflow="auto">
                                        {
                                            locationData?.map((location) => (
                                                <Box
                                                    key={location.id}
                                                    onClick={() => handleLocation(location.externalID, location.name)}
                                                >
                                                    <Text cursor="pointer" bg="gray.200" p="2" borderBottom="1px" borderColor="gray.100">
                                                        {location.name}
                                                    </Text>
                                                </Box>
                                            ))
                                        }
                                        {
                                            !loading && !locationData?.length && (
                                                <Flex justifyContent="center" alignItems="center" flexDir="column" marginTop="5" marginBottom="5">
                                                    <Image src={NoResult} alt="no result" />
                                                    <Text fontSize="xl" marginTop="3">
                                                        Waiting to Search
                                                    </Text>

                                                </Flex>
                                            )
                                        }
                                    </Box>
                                )
                            }

                        </Flex>
                    )
                }

            </Flex>
        </Flex>
    )
};

export default SearchFilters;