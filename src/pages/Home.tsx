import { IonContent, IonPage } from '@ionic/react';

import TodoContainer from '../components/TodoContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <TodoContainer />
      </IonContent>

    </IonPage>
  );
};

export default Home;
