import { ThemedText } from "@/components/themed-text";
import axios from "axios";
import { Checkbox } from 'expo-checkbox';
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";



export default function toDoHome() {
    const[lists, setLists] = useState([]);
    const[list, setList] = useState();
    const[name, setName] = useState();
    const [isChecked, setChecked] = useState({});

    function selectList(){

    }


    const activeQuestsCount = lists.filter(list => !isChecked[list.id]).length;



    const toggleCheckbox = (id) => {
      setChecked(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    };


    function loadLists() {
    axios.get('http://localhost:3000/to-do-list/')
    .then(response => {
      console.log(response.data);
      setLists(response.data);  // <- Set the state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}




     useEffect(() => {
      loadLists();

    return () => {
    };
  }, []);

      return(
        <SafeAreaProvider>
          <View style={styles.father}>
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
                  <ThemedText style={styles.activeQuests}>Quest disponiveis {activeQuestsCount}/{lists.length}</ThemedText>
                  <ScrollView>
                  <View>
                    {lists && lists.map((list, index) => (
                      <View key={list.id} style={styles.container}>
                        <ThemedText>{list.title}</ThemedText>
                        <View style={styles.checkBoxLocation}>
                          <Checkbox style={styles.checkBoxLocation}
                          value={isChecked[list.id] || false}
                          onValueChange={() => toggleCheckbox(list.id)}
                          color={isChecked[list.id] ? '#4630EB' : undefined}/>


                        </View>
                      </View>
                    ))
                    }




                  </View>
              </ScrollView>
              </View>


          </View>
          </SafeAreaProvider>
      );
    }




const styles = StyleSheet.create({
  father:
  {
    overflow: 'scroll'
  },
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
    top: '35%'
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