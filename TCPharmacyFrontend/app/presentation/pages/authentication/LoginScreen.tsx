import { useNavigation } from "@react-navigation/native"
import { Alert, Image, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useState } from "react"
import { GlobalStyles } from "../../styles/GlobalStyles"
import IconAnt from "react-native-vector-icons/AntDesign"
import { LogoCustom } from "../../components/LogoCustom"
import { Colors } from "../../styles/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput } from "react-native-gesture-handler"
import { ButtonCustom } from "../../components/ButtonCustom"
import { ModalCustom } from "../../components/ModalCustom"
import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { generateOTP, setUsertRegister } from "../../redux/slice/UserSlice"
import Toast from "react-native-toast-message"
import { showToast } from "../../../api/AppUtils"

export const LoginScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const userRegister = useSelector((state: Store) => state.user.userRegister);
    const errorRespone = useSelector((state: Store) => state.user.errorResponse);
    const dispatch = useDispatch();

    const sendOTP = async () => {

        if(userRegister.phoneNumber.length !== 10){
            showToast('error', 'bottom', 'Lỗi', 'Số điện thoại không hợp lệ');
            return;
        }
        await dispatch(generateOTP(userRegister.phoneNumber)).unwrap().catch((error: any) => {
            console.log(error);
            showToast('error', 'bottom', 'Lỗi', errorRespone.error || 'Tạo OTP không thành công.');
        });

        navigation.navigate('otp' as never);
        setModalVisible(false);
    }
    return (
        <>
            <SafeAreaView style={[GlobalStyles.container, styles.container]}>
                <ModalCustom
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    content={
                        <View style={{ width: '100%', height: 450, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image style={{ width: 160 }} resizeMode="contain" source={require('./../../../../assets/login_sms.png')} />
                            <Text style={[GlobalStyles.textStyle, { textAlign: 'center' }]}>
                                Mã xác thực được gửi đến số điện thoại <Text style={{ fontWeight: "bold" }}>{userRegister.phoneNumber}</Text> <Text style={{ color: Colors.primary }}>Đổi số điện thoại</Text>
                            </Text>
                            <Text style={GlobalStyles.textStyle}>Vui lòng chọn hình thức nhận mã</Text>
                            <ButtonCustom buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '100%' }} title="Nhận mã qua Zalo" onPress={() => {
                                sendOTP();
                            }} />
                            <ButtonCustom buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '100%', backgroundColor: '#fff' }} textStyle={{ color: Colors.primary }} title="Nhận mã qua SMS" onPress={() => {
                                sendOTP();
                            }} />
                        </View>
                    }
                />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconAnt name="close" size={30} color="#000" />
                    <View style={{ flex: 1 }}>
                        <LogoCustom color={Colors.primary} />
                    </View>
                </View>
                <View style={{ flex: 9 }}>
                    <View style={{ flex: 2 }}>
                        <Text style={[GlobalStyles.textStyle, { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 50 }]}> Vui lòng nhập số điện thoại </Text>
                        <TextInput value={userRegister.phoneNumber} onChangeText={async (text) => {
                            await dispatch(setUsertRegister({ ...userRegister, phoneNumber: text }));
                        }} style={[GlobalStyles.textStyle, { textAlign: 'center', fontSize: 24, fontWeight: 'bold' }]} placeholder="0000 000 000" />
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ButtonCustom buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '100%' }} title="Tiếp tục" onPress={() => {
                             if(userRegister.phoneNumber.length !== 10){
                                showToast('error', 'bottom', 'Lỗi', 'Số điện thoại không hợp lệ.');
                                return;
                            }
                            setModalVisible(!modalVisible);
                        }} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3', }} />
                            <Text style={[GlobalStyles.textStyle, { color: Colors.textDecription, marginVertical: 35, marginHorizontal: 15 }]}>hoặc đăng nhập bằng</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#D3D3D3', }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ width: 45, height: 45, marginHorizontal: 10 }} source={require('./../../../../assets/icon/ic_google.png')} resizeMode="contain" />
                            <Image style={{ width: 45, height: 40, marginHorizontal: 10 }} source={require('./../../../../assets/icon/ic_facebook.png')} resizeMode="contain" />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    }
})