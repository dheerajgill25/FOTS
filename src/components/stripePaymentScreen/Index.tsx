import { initStripe, StripeContainer } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { fetchPublishableKey } from './fetchPublishKey/Index';

interface Props {
  paymentMethod?: string;
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function initialize() {
      const {key} = await fetchPublishableKey();
      if (key) {
        await initStripe({
          publishableKey:key,
          merchantIdentifier: 'merchant.com.stripe.react.native',
          urlScheme: 'stripe-example',
          setUrlSchemeOnAndroid: true,
        });
        setLoading(false);
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <StripeContainer keyboardShouldPersistTaps={false}>
      <ScrollView
        accessibilityLabel="payment-screen"
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{justifyContent:'center',flex:0}}
      >
        {children}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={{ opacity: 0 }}>appium fix</Text>
      </ScrollView>
    </StripeContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreen;