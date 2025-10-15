class BalanceResponse {
  final String email;
  final Map<String, dynamic> balances;

  BalanceResponse({required this.email, required this.balances});

  factory BalanceResponse.fromJson(Map<String, dynamic> json) {
    return BalanceResponse(
      email: json['email'],
      balances: Map<String, dynamic>.from(json['balances'] ?? {}),
    );
  }
}
