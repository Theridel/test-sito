let db; // Variabile globale per il database IndexedDB
export { db };

        // --- Funzioni per IndexedDB ---

        /**
         * Apre o crea il database IndexedDB.
         * Se il database non esiste o la versione è nuova, crea l'object store 'sessions'.
         */
        function openDatabase() {
            return new Promise((resolve, reject) => {
                // Richiesta per aprire il database 'CoachingDB' alla versione 1
                const request = indexedDB.open('CoachingDB', 1);

                request.onerror = (event) => {
                    console.error('Errore nell\'apertura di IndexedDB:', event.target.errorCode);
                    reject('Errore IndexedDB');
                };

                request.onsuccess = (event) => {
                    db = event.target.result; // Assegna il database alla variabile globale
                    console.log('Database IndexedDB aperto con successo');
                    resolve(db);
                };

                // Questo evento viene attivato solo quando il database viene creato per la prima volta
                // o quando si specifica una versione più alta rispetto a quella esistente.
                request.onupgradeneeded = (event) => {
                    db = event.target.result;
                    // Crea l'object store 'sessions' con 'id' come chiave primaria autoincrementante
                    const objectStore = db.createObjectStore('sessions', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    // Crea un indice per 'projectName' per ricerche future basate sul progetto (potrebbe non servire per questo caso specifico ma lo teniamo)
                    objectStore.createIndex('projectName', 'projectName', {
                        unique: false
                    });
                    // Crea un indice per 'timestamp' per ordinare le sessioni cronologicamente e trovare il più recente
                    objectStore.createIndex('timestamp', 'timestamp', {
                        unique: false
                    });
                    console.log('Object store "sessions" creato o aggiornato.');
                };
            });
        }


        export { db, openDatabase };