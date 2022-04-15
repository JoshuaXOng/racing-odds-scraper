package racing.odds.desktop;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import racing.odds.desktop.pages.*;

public class App extends Application {
  public static void main(String[] args) {
    launch();
  }

  @Override
  public void start(Stage mainStage) {   
    DataStore.setMainStage(mainStage);

    Scene mainScene = new Scene(new StackPane(new LoginPage()), 1280, 720);
    mainScene.getStylesheets().add("css/jfoenix-components.css");
    mainScene.getStylesheets().add("css/jxo-custom.css");
    DataStore.setMainScene(mainScene);

    Image mainStageIcon = new Image("gunther.png");
    mainStage.getIcons().add(mainStageIcon);
    mainStage.setTitle("Racing Odds");
    mainStage.setScene(mainScene);
    mainStage.show();
  }
}
