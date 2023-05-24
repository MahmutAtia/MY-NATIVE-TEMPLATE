import db from "../db";


export const markAsOnProgress = (item,notes,setNotes) => {
    console.log("markAsOnProgress");
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE notes SET onProgress = ?  WHERE id = ?",
        item.onProgress === 1 ? [0, item.id] : [1, item.id],
        (txObj, resultset) => {
            if (resultset.rowsAffected > 0){


                console.log("Mark progress NOTE" + item.id.toString());
                let existingNotes = [...notes]; 
                let index = existingNotes.findIndex((note) => note.id === item.id);
                item.onProgress = item.onProgress === 1 ? 0 : 1;
                existingNotes[index] = item;
                setNotes(existingNotes);
                

            }
        },

        (txObj, err) => console.log(err)
      );
    });
  };



    
  // mark completed
 export const markAsCompleted = (item,notes,setNotes) => {
    let date = new Date().toJSON().slice(0, 10);
    console.log("adding to note");
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE notes SET completed = ? , completed_at = ? , onProgress = ? WHERE id = ?",
        item.completed === 1 ? [0, null, 0, item.id] : [1, date,0, item.id],
        (txObj, resultset) => {
            if (resultset.rowsAffected > 0){


                console.log("Mark completed NOTE" + item.id.toString());
                let existingNotes = [...notes];
                let index = existingNotes.findIndex((note) => note.id === item.id);
                item.completed = item.completed === 1 ? 0 : 1;
                item.completed_at =  item.completed === 1 ? null : date;
                item.onProgress =  item.completed === 1 ? 0 : item.onProgress;  // if completed cancel on progress
                existingNotes[index] = item;
                setNotes(existingNotes);

            }


        },

        (txObj, err) => console.log(err)
      );
    });
  };





  const summmarize = (data) => {
    axios
      .post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        data,
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
          method: "POST",
        }
      )
      .then((res) => {
        console.log(res.data);
        setSummary(res.data[0].summary_text);
      })
      .catch((err) => {
        console.log(err);
      });
  };