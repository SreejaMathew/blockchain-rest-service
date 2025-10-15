import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/balance_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Wallet App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: LoginScreen(),
      routes: {'/balance': (_) => BalanceScreen()},
    );
  }
}
