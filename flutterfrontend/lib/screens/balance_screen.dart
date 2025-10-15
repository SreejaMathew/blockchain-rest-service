import 'package:flutter/material.dart';
import '../models/balance_response.dart';
import '../services/api_service.dart';

class BalanceScreen extends StatefulWidget {
  const BalanceScreen({super.key});

  @override
  State<BalanceScreen> createState() => _BalanceScreenState();
}

class _BalanceScreenState extends State<BalanceScreen> {
  BalanceResponse? balanceData;
  bool loading = true;

  @override
  void initState() {
    super.initState();
    _fetchBalances();
  }

  Future<void> _fetchBalances() async {
    final data = await ApiService.getBalances();
    setState(() {
      balanceData = data;
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Your Balances')),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : balanceData == null
          ? const Center(child: Text('No data available'))
          : _buildBalanceList(),
    );
  }

  Widget _buildBalanceList() {
    final balances = balanceData!.balances;
    final tokens = balances.keys.toList();

    if (tokens.isEmpty) {
      return const Center(child: Text('No balances found.'));
    }

    return ListView.builder(
      itemCount: tokens.length,
      itemBuilder: (context, index) {
        final token = tokens[index];
        final value = balances[token];

        return ListTile(
          title: Text(token),
          subtitle: Text('Balance: $value'),
          trailing: const Icon(Icons.arrow_forward_ios),
          onTap: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Transactions for $token (coming soon)')),
            );
          },
        );
      },
    );
  }
}
