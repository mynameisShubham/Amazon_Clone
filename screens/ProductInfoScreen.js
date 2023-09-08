import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/CartReducer';

const ProductInfoScreen = () => {
  const route = useRoute();
  const {width} = Dimensions.get('window');
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}} //big mobile so add marginTop:45
      showsHorizontalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: '#00CED1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
          <AntDesign
            style={{paddingLeft: 10}}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{width, height, marginTop: 25, resizeMode: 'contain'}}
            source={{uri: item}}
            key={index}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#C60C30',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 12,
                  }}>
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={24}
                  color="black"
                />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 'auto',
                marginLeft: 20,
                marginBottom: 20,
              }}>
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
          {route?.params?.title}
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            marginTop: 6,
            color: 'black',
          }}>
          ₹{route?.params?.price}
        </Text>
      </View>

      <Text
        style={{
          height: 1,
          borderColor: '#D0D0D0',
          borderWidth: 1,
        }}></Text>

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{color: 'black'}}>Color:</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{color: 'black'}}>Size:</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
          {route?.params?.size}
        </Text>
      </View>

      <Text
        style={{
          height: 1,
          borderColor: '#D0D0D0',
          borderWidth: 1,
        }}
      />

      <View style={{padding: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginVertical: 5,
            color: 'black',
          }}>
          Total :₹{route.params.price}
        </Text>
        <Text style={{color: '#00CED1'}}>
          FREE delivery Tomarrow by 3 PM.Order within 10hrs 30 mins
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
            gap: 5,
          }}>
          <Ionicons name="location" size={24} color="black" />
          <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
            Delivered To Shubham - Nagpur 440044
          </Text>
        </View>
      </View>
      <Text style={{color: 'green', marginHorizontal: 10, fontWeight: '500'}}>
        IN Stock
      </Text>

      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: '#FFC72C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        {addedToCart ? (
          <View>
            <Text>Added to cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#FFAC1C',
          padding: 10,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
        }}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
