import { Button, Text } from "react-native";

function Transactions({ navigation }) {
    return (
        <>
            <Text>All transactions</Text>
            <Button
                title="Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </>
    )
}

export default Transactions;
