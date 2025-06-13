import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function App() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (!description.trim() || !amount.trim()) {
      alert("Please enter description and amount");
      return;
    }
    if (isNaN(amount)) {
      alert("Amount should be a valid number");
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Generate PDF HTML content
  const generateHTML = () => {
    const rows = expenses
      .map(
        (exp) =>
          `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${exp.description}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${exp.amount.toFixed(
              2
            )}</td>
          </tr>`
      )
      .join("");

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px;}
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
            tfoot td { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Expenses Report</h1>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td style="text-align: right;">₹${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;
  };

  const createAndSharePDF = async () => {
    if (expenses.length === 0) {
      alert("Add some expenses first!");
      return;
    }
    try {
      const html = generateHTML();

      const { uri } = await Print.printToFileAsync({
        html,
        width: 612, // A4 size in points (8.5*72)
        height: 792, // A4 size in points (11*72)
      });

      // Share PDF file
      await Sharing.shareAsync(uri);
    } catch (error) {
      alert("Error generating PDF: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Expenses Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Amount"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button title="Add Expense" onPress={addExpense} />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.expenseItem}
              onPress={() => deleteExpense(item.id)}
            >
              <Text style={styles.expenseText}>
                {item.description} - ₹{item.amount.toFixed(2)}
              </Text>
              <Text style={styles.deleteText}>Tap to Delete</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No expenses added yet.</Text>
          }
        />
      </View>

      <View style={{ marginVertical: 200 }}>
        <Button title="Generate PDF Report" onPress={createAndSharePDF} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expenseItem: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  expenseText: {
    fontSize: 16,
  },
  deleteText: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
