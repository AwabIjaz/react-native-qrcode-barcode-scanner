import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Alert,
    Text,
    Toast,
    Linking,
    WebView,
    Platform,
    Dimensions,
    StatusBar,
} from 'react-native';

import QRScannerView from './QRScanner';
var x=1;


export default class DefaultScreen extends Component {

    render() {
        return (

          <View style={{flex:1}}>
            <StatusBar hidden={true} />
            < QRScannerView
                onScanResultReceived={this.barcodeReceived.bind(this)}

                renderTopBarView={() => this._renderTitleBar()}

                renderBottomMenuView={() => this._renderMenu()}
            />
          </View>
        )
    }

    _renderTitleBar(){
        return(
            <Text style={s.text1}>Scan Digital ID</Text>
        );
    }

    _renderMenu() {
        return (
            <Text style={s.text2}>QR and Barcode Scanner</Text>
        )
    }

    barcodeReceived(e) {
      if(x==1){
      Linking.canOpenURL(e.data).then(supported => {
        if (supported) {
          Linking.openURL(e.data);
          } else {
            x=0;
            Alert.alert(
                    e.data,
                    '',
                    [
                      {text: 'OK', onPress: () => this._start()},
                    ],
                    { cancelable: false }
                  )
              }
        });
      }
    }

    _start(){
      x=1;
    }


}

SCREEN_WIDTH = (Dimensions.get('window').width)/10;
SCREEN_HEIGHT = (Dimensions.get('window').height+300);

getAdjustedFontSize = (size) => {
  return parseInt(size*SCREEN_WIDTH*SCREEN_HEIGHT)/8500;
}


const s = StyleSheet.create({
    text1: {
        ...Platform.select({
         ios: { fontFamily: 'Arial' },
         android: { fontFamily: 'sans-serif' }
        }),
        color:'white',
        textAlignVertical:'center',
        textAlign:'center',
        marginTop:"40%",
        fontSize:getAdjustedFontSize(6),
    },
    text2: {
        ...Platform.select({
         ios: { fontFamily: 'Arial', },
         android: { fontFamily: 'sans-serif' }
        }),
        color:'black',
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:getAdjustedFontSize(6),
    },
});
