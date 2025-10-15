class BalanceResponse {
  final String email;
  final Map<String, Account> accounts;

  BalanceResponse({required this.email, required this.accounts});

  factory BalanceResponse.fromJson(Map<String, dynamic> json) {
    final accountsJson = json['accounts'] as Map<String, dynamic>;
    final accounts = accountsJson.map(
      (key, value) => MapEntry(
        key,
        Account(
          balance: value['balance'] ?? 0,
          rpc: value['rpc'] ?? '',
          instance: value['instance'] ?? '',
        ),
      ),
    );

    return BalanceResponse(email: json['email'] ?? '', accounts: accounts);
  }
}

class Account {
  final dynamic balance;
  final String rpc;
  final String instance;

  Account({required this.balance, required this.rpc, required this.instance});
}
