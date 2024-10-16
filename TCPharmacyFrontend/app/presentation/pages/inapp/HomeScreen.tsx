import { Alert, BackHandler, Image, Text, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { DrawerLayout, ScrollView } from "react-native-gesture-handler";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawScreenLayout } from "../../components/DrawLayoutCustom";
import { LogoCustom } from "../../components/LogoCustom";
import { Colors } from "../../styles/Colors";
import IconE from "react-native-vector-icons/Entypo";
import IconF from "react-native-vector-icons/FontAwesome";
import IconFE from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-paper";
import { FlatList } from "react-native";
import { MenuItem } from "../../components/MenuItem";
import Carousel from "react-native-snap-carousel";
import { BannerCustom } from "../../components/BannerCustom";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
const menus = [
    {
        id: 'menu1',
        icon: require('./../../../../assets/icon/menu/ic_need.png'),
        title: 'Cần mua thuốc',
        onPress: () => { },
    },
    {
        id: 'menu2',
        icon: require('./../../../../assets/icon/menu/ic_consult.png'),
        title: 'Tư vấn với Dược Sỹ',
        onPress: () => { },
    },
    {
        id: 'menu3',
        icon: require('./../../../../assets/icon/menu/ic_find_pharmacy.png'),
        title: 'Tìm nhà thuốc',
        onPress: () => { },
    },
    {
        id: 'menu4',
        icon: require('./../../../../assets/icon/menu/ic_my_order.png'),
        title: 'Đơn của tôi',
        onPress: () => { },
    },
    {
        id: 'menu5',
        icon: require('./../../../../assets/icon/menu/ic_vaccination.png'),
        title: 'Tiêm vắc xin',
        onPress: () => { },
    },
    {
        id: 'menu6',
        icon: require('./../../../../assets/icon/menu/ic_health_check.png'),
        title: 'Kiểm tra sức khỏe',
        onPress: () => { },
    },
    {
        id: 'menu7',
        icon: require('./../../../../assets/icon/menu/ic_remeber_medicine.png'),
        title: 'Nhắc uống thuốc',
        onPress: () => { },
    },
    { id: '8', icon: null, title: '', onPress: () => { } }

]

const purchasedProducts = [
    {
        id: 1,
        image: require(),
        price: 100000,
        orderDate: '10/07/2024',
    }
]
export const HomeScreen = () => {
    const navigation = useNavigation();
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert(
    //             "Thoát!",
    //             "Bạn có chắc chắn muốn thoát?",
    //             [
    //                 {
    //                     text: "Không",
    //                     onPress: () => null,
    //                     style: "cancel"
    //                 },
    //                 { text: "Chắc chắn", onPress: () => BackHandler.exitApp() }
    //             ]
    //         );
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // }, []);

    const drawer = useRef(null);
    const closeDrawer = () => {
        (drawer.current as DrawerLayout | null)?.closeDrawer();
    }
    const [search, setSearch] = useState<string>('');
    return (
        <>
            <DrawerLayout
                ref={drawer}
                drawerWidth={310}
                drawerPosition="left"
                renderNavigationView={() => {
                    return (
                        <DrawScreenLayout onClose={closeDrawer} />
                    )
                }}
            >
                <ScrollView>
                    <SafeAreaView style={GlobalStyles.container}>

                        {/* <Button 
    title="Open Drawer"
    onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} // Mở Drawer khi nhấn
/> */}
                        {/** Start Header Component */}
                        <View style={{ backgroundColor: Colors.primary, height: 200, marginHorizontal: -15 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                                <IconE name="menu" size={34} color={"#fff"} onPress={() => (drawer.current as DrawerLayout | null)?.openDrawer()} />
                                <LogoCustom color={"#fff"} />
                                <IconF name="bell" size={34} color={"#fff"} />
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                                <TextInput
                                    value={search}
                                    onChangeText={setSearch}
                                    placeholder="Tìm tên thuốc, bệnh lý, TPCN, ..."
                                    mode="outlined"
                                    outlineColor={Colors.primary}
                                    activeOutlineColor={Colors.primary}
                                    placeholderTextColor="gray"
                                    outlineStyle={{ borderRadius: 30 }}
                                    style={[GlobalStyles.textStyle, { backgroundColor: '#fff' }]}
                                    left={<TextInput.Icon icon={() => <IconFE name="search" size={30} color="gray" />} />}  // Biểu tượng bên trái
                                />
                            </View>
                        </View>
                        {/** End Header Component */}
                        {/** Start Body  Component*/}
                        <View style={{ borderTopRightRadius: 30, borderTopLeftRadius: 30, marginHorizontal: -15, marginTop: -30, backgroundColor: Colors.secondary }}>
                            <View style={{ paddingHorizontal: 15, paddingVertical: 30 }}>
                                <Text style={[GlobalStyles.textStyle]}>Xin chào, <Text style={{ fontWeight: 'bold' }}>ĐÔN CHỦNG</Text></Text>
                                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {
                                    navigation.navigate('bonusNavigation' as never);
                                }} >
                                    <Image source={require('./../../../../assets/icon/ic_point.png')} resizeMode="contain" />
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'medium', marginStart: 10 }]}>494 điểm thưởng</Text>
                                </TouchableOpacity>
                            </View>

                            {/** Start Menu Component */}
                            <View style={{ paddingHorizontal: 15, height: 300 }}>
                                <FlatList
                                    nestedScrollEnabled
                                    data={menus}
                                    scrollEnabled={false}
                                    renderItem={
                                        ({ item, index }) => {

                                            const isFirstColumn = index % 4 === 0;
                                            const isLastColumn = (index + 1) % 4 === 0;
                                            return (
                                                <MenuItem
                                                    styleContainer={{ marginLeft: isFirstColumn ? 0 : 10, marginRight: isLastColumn ? 0 : 10, marginVertical: 10, height: 110 }}
                                                    icon={item.icon}
                                                    title={item.title}
                                                    onPress={item.onPress}
                                                />
                                            )
                                        }

                                    }
                                    keyExtractor={
                                        (item) => item.id
                                    }
                                    numColumns={4}
                                />
                            </View>
                            {/** End Menu Component */}


                            {/** Start Banner Carousel Component */}
                            <View>
                                <BannerCustom />
                            </View>
                            {/** End Banner Carousel Component */}

                            {/** Start Purchased Product Component */}
                            <View style={{paddingHorizontal: 15}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', fontSize: 18}]}>Mua lại nhanh chóng</Text>
                                    <Text style={[GlobalStyles.textStyle, { fontWeight: 'bold', color: Colors.primary}]}>Xem tất cả</Text>
                                </View>
                                <View>
                                    
                                </View>
                            </View>
                            {/** End Purchased Product Component */}
                        </View>
                        {/** End Body  Component*/}
                    </SafeAreaView>
                </ScrollView>

            </DrawerLayout>

        </>

    )
}