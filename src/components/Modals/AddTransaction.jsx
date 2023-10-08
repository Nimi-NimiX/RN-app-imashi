import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns';

const AddTransactionModal = ({ isOpen, onClose, onChange, onDoneAdd, newTransaction }) => {

    const [date, setDate] = useState(new Date(newTransaction.date));
    const [show, setShow] = useState(false);
    const categories = [ 'Groceries', 'Medical', 'Transportation', 'Education', 'UtilityBills', 'Other'];

    const onChangeDate = (event, selectedDate) => {
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);

      const dateString = currentDate.toISOString().slice(0, 10);
      onChange('date', dateString);
    };

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
       <View style={styles.modalContainer}>
         <View style={styles.modalContent}>
           <Text style={styles.modalTitle}>Add new transaction</Text>
 
           <TouchableOpacity onPress={() => setShow(true)} style={styles.dateButton}>
             <Text>{format(date, 'yyyy-MM-dd')}</Text>
           </TouchableOpacity>
 
           {show && <DateTimePicker value={date} mode="date" onChange={onChangeDate} />}
 
           <View style={styles.pickerContainer}>
             <Picker
               style={styles.picker}
               selectedValue={newTransaction.category}
               onValueChange={(itemValue) => onChange('category', itemValue)}
             >
              <Picker.Item label="Select Category" value="" />
              { categories.map((item) => (
                <Picker.Item label={item} key={item} value={item} />
              ))}
             </Picker>
           </View>
 
           <TextInput
             placeholder="Name"
             style={styles.textInput}
             value={newTransaction.name}
             onChangeText={(text) => onChange('name', text)}
           />
 
           <TextInput
             placeholder="Amount(LKR)"
             style={styles.amountInput}
             value={newTransaction.amount.toString()}
             keyboardType="numeric"
             onChangeText={(text) => onChange('amount', text)}
           />
 
           <View style={styles.buttonContainer}>
             <TouchableOpacity onPress={onDoneAdd} style={styles.addButton}>
               <Text style={styles.buttonText}>Add Transaction</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
               <Text style={styles.buttonText}>Cancel</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </Modal>
  );
};

export default AddTransactionModal;

// styles.js
import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dateButton: {
    margin: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  pickerContainer: {

  },
  picker: {
    
  },
  textInput: {
    margin: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black'
  },
  amountInput: {
    margin: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: GlobalStyles.colors.primary.main,
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#999494',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
  },
});
