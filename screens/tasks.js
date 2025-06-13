import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: taskText.trim(), completed: false },
    ]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🌿 Agriculture Tasks</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add new task (e.g. Water the crops)"
            style={styles.input}
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            returnKeyType="done"
            placeholderTextColor="#6b8e23"
          />
          <View style={styles.addButton}>
            <Button title="Add" color="#4caf50" onPress={addTask} />
          </View>
        </View>

        <View style={styles.countRow}>
          <View style={styles.countBox}>
            <Text style={styles.countNumber}>{totalTasks}</Text>
            <Text style={styles.countLabel}>Total</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countNumber}>{completedTasks}</Text>
            <Text style={styles.countLabel}>Completed</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countNumber}>{remainingTasks}</Text>
            <Text style={styles.countLabel}>Remaining</Text>
          </View>
        </View>

        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tasks.length === 0 && styles.emptyList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.taskItem,
                item.completed && styles.completedTask,
              ]}
              onPress={() => toggleTask(item.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks added yet.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#c8e6c9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    color: "#2e7d32",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  addButton: {
    marginLeft: 12,
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  countBox: {
    alignItems: "center",
    backgroundColor: "#a5d6a7",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  countNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1b5e20",
  },
  countLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#33691e",
    marginTop: 4,
  },
  list: {
    flex: 1,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskItem: {
    backgroundColor: "#a5d6a7",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: "#c8e6c9",
  },
  taskText: {
    fontSize: 18,
    color: "#2e7d32",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#558b2f",
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: 18,
    color: "#7cb342",
    fontStyle: "italic",
  },
});
