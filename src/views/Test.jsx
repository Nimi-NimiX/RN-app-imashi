// MainComponent.js
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../store/transactionSlice";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AddTransactionModal from "../components/Modals/AddTransaction";
import { GlobalStyles } from "../constants/styles";
import EditTransactionModal from "../components/Modals/EditTransaction";

const MainComponent = () => {
  const dispatch = useDispatch();
  const TRANSACTIONS = useSelector((state) => state.transactions.transactions); // get latest transactions from the store

  const today = (new Date()).toISOString().slice(0, 10); // get current date in the format of 'YYYY-MM-DD'
  const [newTransaction, setNewTransaction] = useState({
    id: undefined,
    type: "",
    date: today,
    category: "",
    name: "",
    amount: '',
  });
  const [isAddTransactionModelOpen, setIsAddTransactionModelOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isEditTransactionModelOpen, setIsEditTransactionModelOpen] = useState(false);

  // the component will re-render everytime an action is dispatched to recieve the latest state
  useEffect(() => {
    console.log("Latest transactions state: ", TRANSACTIONS);
  }, [dispatch]);

  /* methods belongs to add new transaction are below */ 
  const handleAddTransaction = () => {
    setIsAddTransactionModelOpen(true);
  };

  const handleCloseAddTransactionModal = () => {
    setIsAddTransactionModelOpen(false);
  };

  const onAddTransactionInputChange = (name, value) => {
    setNewTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const doneAddTransaction = () => {
    const uniqueId = uuidv4();
    const newT = {
      ...newTransaction,
      id: uniqueId, // assign a unique id
    };
    dispatch(addTransaction(newT));
    setIsAddTransactionModelOpen(false);
    // clear the input fields of the form
    setNewTransaction({
      id: undefined,
      type: "",
      date: today,
      category: "",
      name: "",
      amount: '',
    })
  };

  /* methods belongs to edit transaction are below */ 
  const handleEditTransaction = (id) => {
    // set selected transaction details to use state
    setSelectedTransaction(TRANSACTIONS.find(item => item.id === id));
    setIsEditTransactionModelOpen(true);
  };
  
  const handleCloseEditTransactionModal = () => {
    setIsEditTransactionModelOpen(false);
  };
  
  const onEditTransactionInputChange = (name, value) => {
    setSelectedTransaction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const doneEditTransaction = () => {
    console.log('editingg', selectedTransaction)
    dispatch(updateTransaction({ id: selectedTransaction.id, data: selectedTransaction }));
    setIsEditTransactionModelOpen(false);
  };

  const handleDeleteTransaction = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={TRANSACTIONS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>ID: {item.id}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Amount: {item.amount}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                handleEditTransaction(item.id)
              }
            >
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeleteTransaction(item.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
        <Text>Add Transaction</Text>
      </TouchableOpacity>
      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTransactionModelOpen}
        onClose={handleCloseAddTransactionModal}
        onDoneAdd={doneAddTransaction}
        onChange={onAddTransactionInputChange}
        newTransaction={newTransaction}
      />
      {/* Add Transaction Modal */}
      <EditTransactionModal
        isOpen={isEditTransactionModelOpen}
        onClose={handleCloseEditTransactionModal}
        onDoneEdit={doneEditTransaction}
        onChange={onEditTransactionInputChange}
        selectedTransaction={selectedTransaction}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
});

export default connect(mapStateToProps, {
  updateTransaction,
  deleteTransaction,
})(MainComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary.main,
    borderRadius: 5,
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
