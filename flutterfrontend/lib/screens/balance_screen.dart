// lib/screens/balance_screen.dart

import 'package:flutter/material.dart';
import '../models/balance_response.dart';
import '../services/api_service.dart';

class BalanceScreen extends StatefulWidget {
  const BalanceScreen({super.key});

  @override
  State<BalanceScreen> createState() => _BalanceScreenState();
}

class _BalanceScreenState extends State<BalanceScreen> {
  BalanceResponse? balanceResponse;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchBalances();
  }

  // ✅ Fetch balances from API service
  Future<void> _fetchBalances() async {
    final response = await ApiService.getBalances();
    setState(() {
      balanceResponse = response; // Already a BalanceResponse object
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Account Balances')),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : balanceResponse == null || balanceResponse!.accounts.isEmpty
          ? const Center(child: Text('No balances found'))
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: DataTable(
                  columns: const [
                    DataColumn(label: Text('Token')),
                    DataColumn(label: Text('Balance')),
                    DataColumn(label: Text('RPC')),
                    DataColumn(label: Text('Instance')),
                    DataColumn(label: Text('Link')),
                  ],
                  rows: balanceResponse!.accounts.entries.map((entry) {
                    final token = entry.key;
                    final account = entry.value;
                    return DataRow(
                      cells: [
                        DataCell(Text(token)),
                        DataCell(Text(account.balance.toString())),
                        DataCell(Text(account.rpc)),
                        DataCell(Text(account.instance)),
                        DataCell(
                          TextButton(
                            onPressed: () {
                              // TODO: Navigate to transactions page for this token
                            },
                            child: const Text('View'),
                          ),
                        ),
                      ],
                    );
                  }).toList(),
                ),
              ),
            ),
    );
  }
}
