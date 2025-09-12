import { ThemedText } from "@/components/themed-text";
import { Checkbox } from 'expo-checkbox';
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";



export default function toDoHome() {
    const[lists, setLists] = useState();
    const[list, setList] = useState();
    const[isChecked, setChecked] = useState([]  );


    function selectList(){

    }


    function loadLists()
    {
        ///Ainda tenho que Setar
    }
    function handleBoxChange()
    {

    }


    return (
        <View>
            <View style={styles.mainContainer}>

                <View style={styles.statsContainer}>
                            <View style={{alignItems: 'center'}}>
                    <ThemedText>User</ThemedText>

                    <View>
                    <Image 
                        source={'https://preview.redd.it/jonkler-bom-dia-v0-l7spc07a1kqd1.jpeg?auto=webp&s=2611c954e108166dd5428e1acac95d7296693c06'} 
                        style={{ width: 100, height: 100, borderRadius: 50 }} 
                    />
                    </View>
                            <ThemedText>Coringa_Silva</ThemedText>
                            </View>
                    






                </View>
                <View style={styles.statsContainer}>
                    <ThemedText>Stats</ThemedText>
                    <Text>Completed: 10/14</Text>
                    <Text>Pending: 4</Text>
                    <Text>Completion Percentage: 71%</Text>
                    
                    
                    
                    
                </View>

            </View>





            <View style={styles.questContainer}>
                <Text style={styles.title}>Quests</Text>
            </View>
            <View>
                <ThemedText style={styles.activeQuests}>Quests Disponiveis 1/1</ThemedText>
                <View style={styles.container}>
                    <View>
                        <ThemedText>Lavar Louças</ThemedText>
                        <Text>As louças precisam ser lavadas até 17:40</Text>
                    </View>
                    <View style={styles.checkBoxLocation}>
                        <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                        />
                    </View>
                </View>
            
            </View>


        </View>
    );

}

const styles = StyleSheet.create({
  container: 
  {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    marginTop: 0,
    padding: 10,
    boxShadow: '0px 0px 10px #5a5a5aff',
    borderRadius: '5px'
  },
  checkBoxLocation: 
  {
    display: 'flex',
    alignItems: 'center',
    right: 15,
    position: 'absolute',
    top: 25
  },
  mainContainer:
  {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: '10%',
    border: '1px solid #000',
    borderRadius: '5px',
    height: 200,
    width: '100%',
    marginTop: 50,
    
  },
  statsContainer: 
  {
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   width: '50%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questContainer: 
  {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '35%',
  },
  activeQuests: 
  {
    marginBottom: 20
  }
  
});