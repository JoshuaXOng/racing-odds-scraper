package racing.odds.desktop;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import racing.odds.desktop.pages.*;

public class App extends Application {
  public static void main(String[] args) {
    launch();
  }

  @Override
  public void start(Stage mainStage) {
    DataStore.setMainStage(mainStage);
    
    Scene initialPage = new LoginPage();

    Image mainStageIcon = new Image("gunther.png");
    mainStage.getIcons().add(mainStageIcon);
    mainStage.setTitle("Racing Odds");
    mainStage.setScene(initialPage);
    mainStage.show();
  }
}
