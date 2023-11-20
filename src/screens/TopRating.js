import {
    View,
    Text,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Loading from '../components/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {styles} from '../theme';
import MovieList from '../components/MovieList';
import React, {useEffect, useState} from 'react';
import {
    fetchTopRatedMovies,
  } from '../api/MovieDb';
const ios = Platform.OS === 'ios';

export default function TopRating(){
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getTopRatedMovies();
        }, []);
        const getTopRatedMovies = async () => {
            const data = await fetchTopRatedMovies();
            // console.log('got top rated movies:', data);
            if (data && data.results) {
            setTopRated(data.results);
            setLoading(false)
            }
        };
        return (
            <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
                <Text className="text-white text-3xl font-bold">
                    <Text style={styles.text}>K</Text>
                    atalog <Text style={styles.text}>F</Text>ilm
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading ? (
              <Loading />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}>
                {/* daftar film trending dengan carousel */}
                
      
                {/* daftar film akan tayang */}
                {topRated.length > 0 &&<MovieList title="Rating Teratas" position="vertical" data={topRated} />}
    
              </ScrollView>
            )}
                    </View>
        )
}