package racing.odds.desktop;

import java.util.ArrayList;

import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class DataStore {
  private static Stage mainStage;
  private static Scene mainScene;
  private static ArrayList<Node> pageHistory = new ArrayList<>();
  static ArrayList<String> alerts = new ArrayList<>();

  public static String authToken;

  public static void setMainStage(Stage stage) {
    DataStore.mainStage = stage;
  }

  public static void setMainStageSize(double width, double height) {
    DataStore.mainStage.setWidth(width);
    DataStore.mainStage.setHeight(height);
  }

  public static void setMainScene(Scene scene) {
    DataStore.mainScene = scene;
  }

  public static void pushPage(Pane page) {
    DataStore.pageHistory.add(((StackPane) DataStore.mainScene.getRoot()).getChildren().remove(0));
    ((StackPane) DataStore.mainScene.getRoot()).getChildren().add(0, page);
  };

  public static void popPage() {
    ((StackPane) DataStore.mainScene.getRoot()).getChildren().remove(0);
    ((StackPane) DataStore.mainScene.getRoot()).getChildren().add(0, (Pane) pageHistory.remove(pageHistory.size() - 1));
  };
}
