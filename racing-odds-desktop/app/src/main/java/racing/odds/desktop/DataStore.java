package racing.odds.desktop;

import java.util.ArrayList;

import javafx.stage.Stage;
import javafx.scene.Scene;

public class DataStore {
  private static Stage mainStage;
  private static ArrayList<Scene> sceneHistory = new ArrayList<>();

  public static String authToken;

  public static void setMainStage(Stage stage) {
    DataStore.mainStage = stage;
  }

  public static void pushScene(Scene scene) {
    sceneHistory.add(scene);
    DataStore.mainStage.setScene(scene);
  };

  public static void popScene() {
    sceneHistory.remove(sceneHistory.size() - 1);
    DataStore.mainStage.setScene(sceneHistory.get(sceneHistory.size() - 1));
  };
}
