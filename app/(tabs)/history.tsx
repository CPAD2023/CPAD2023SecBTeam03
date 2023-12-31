import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, Animated } from 'react-native';
import { Text, View } from '../../components/Themed';
import URL from '../../constants/url';
import { FONT } from '../../constants';

interface RecipeHistory {
  _id: string;
  request: string;
  status: string;
  llmResponse: string;
  createdDate: string;
  isFavorite:boolean;
}

const ITEM_MARGIN_BOTTOM = 20;
const ITEM_PADDING = 10;
export default function TabTwoScreen() {

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<RecipeHistory[]>([]);
  const [filteredData, setFilteredData] = useState<RecipeHistory[]>([]); // New state for filtered data
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const apiUrl = URL.baseURL+'/prompts/getAllRecipes';

  useEffect(() => {
    const fetchData = async () => {

        fetch(apiUrl)
        .then((res) =>res.json())
        .then((resJson) =>{
          const recipesWithFavorites: RecipeHistory[] = resJson.data.map((recipe: RecipeHistory) => ({
            ...recipe,
            isFavorite: false,
          }));
          setData(recipesWithFavorites);
        })
        .catch((error) => {
          console.log("Request API Error: ", error);
        }).finally(() => setIsLoading(false));
    };

    fetchData();

  }, []);

  useEffect(() => {
    filterData();
  }, [data, searchQuery]);

  const filterData = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) => item.request.toLowerCase().includes(lowerCaseQuery));
    setFilteredData(filtered);
  };

  const renderItem = ({ item, index }: { item: RecipeHistory; index: number }) => {

    const scale = scrollY.interpolate({
      inputRange: [
        -1, 0,
        100 * index,
        100 * (index + 2)
      ],
      outputRange : [1, 1, 1, 0]
    })

    const handleItemPress = () => {

      router.push({
        pathname: '../response/response',
        params: item as any,
      })

    };

    const handleFavIcon = () => {
      setData((prevData) =>
        prevData.map((recipe: RecipeHistory) =>
          recipe._id === item._id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
        )
      );
    };

    return (
      <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
        <TouchableOpacity onPress={handleItemPress}>
          <View style={styles.wrapText}>
            <Text style={styles.fontSize}>{item.request}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavIcon}>
          <Image
            source={item.isFavorite ? require('../../assets/icons/heart.png') : require('../../assets/icons/heart-ol.png')}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const refreshData = () => {
    fetch(apiUrl)
      .then((res) =>res.json())
      .then((resJson) =>{
        const recipesWithFavorites: RecipeHistory[] = resJson.data.map((recipe: RecipeHistory) => ({
          ...recipe,
          isFavorite: false,
        }));
        setData(recipesWithFavorites);
      })
      .catch((error) => {
        console.log("Request API Error: ", error);
      }).finally(() => setIsLoading(false));
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Recipe..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={refreshData} style={styles.button}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {filteredData.length > 0 ? (
        <Animated.FlatList
          data={filteredData}
          keyExtractor={(item) => `${item._id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 20
          }}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )
          }
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Image
            source={require('../../assets/images/rabbitNoRecipe.png')}
            style={styles.recipeNotPresent}
          />
          <Text style={styles.emptyListText}>No recipes? No problem! Let's start creating some culinary magic together.</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fontSize: {
    fontSize: 18
  },
  wrapText: {
    flex: 0.8,
    marginLeft: 10,
    justifyContent: "center",
    paddingRight: 50
  },
  item: {
    flexDirection: 'row',
    marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: 10,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 20,
      },
    }),
    padding: ITEM_PADDING,
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 7,
    flex: 0.2,
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: 'red',
  },
  searchInput: {
    height: "100%",
    width: "80%",
    borderColor: 'gray',
    borderWidth: 1,
    margin: "2%",
    paddingLeft: "5%",
    backgroundColor: 'white',
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center'
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: 'gray',
    fontFamily: FONT.medium,
    width: "80%",
    fontWeight: 'bold', 
  },
  recipeNotPresent: {
    width: "50%",
    height: "27%",
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
