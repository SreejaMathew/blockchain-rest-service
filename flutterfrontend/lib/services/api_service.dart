import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/balance_response.dart';

class ApiService {
  static const baseUrl = 'http://192.168.18.32:3000';

  /// -----------------------
  /// LOGIN
  /// -----------------------
  static Future<bool> login(String username, String password) async {
    print("Attempting login...");
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': username, 'password': password}),
      );

      print('Response status code: ${response.statusCode}');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final token = data['token'];

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token ?? '');

        print("Login successful, token saved.");
        return true;
      } else {
        print('Login failed with status: ${response.statusCode}');
        return false;
      }
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }

  /// -----------------------
  /// GET BALANCES
  /// -----------------------
  static Future<BalanceResponse?> getBalances() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');
      if (token == null || token.isEmpty) {
        print("No token found. User not logged in.");
        return null;
      }

      final response = await http.get(
        Uri.parse('$baseUrl/balance'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      print('Balance API status: ${response.statusCode}');
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return BalanceResponse.fromJson(data);
      } else {
        print('Failed to fetch balances: ${response.statusCode}');
        return null;
      }
    } catch (e) {
      print('Error fetching balances: $e');
      return null;
    }
  }
}
