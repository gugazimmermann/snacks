import React from 'react';

import DetailedTwitt from '../components/DetailedTwitt';

const Details = ({ route }) => <DetailedTwitt {...route.params} />;

export default Details;
