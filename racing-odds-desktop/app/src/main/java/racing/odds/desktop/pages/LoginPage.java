package racing.odds.desktop.pages;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.layout.VBox;
import javafx.util.Pair;
import racing.odds.desktop.components.ContestantGraph;
import racing.odds.desktop.components.LoginForm;

public class LoginPage extends Scene {
  public LoginPage() {
    super(new VBox(20), 1280, 720);
    
    ((VBox) this.getRoot()).setAlignment(Pos.CENTER);
    ((VBox) this.getRoot()).getStyleClass().add("login-page");
    
    
    VBox loginForm = new LoginForm(fields -> {});
    ((VBox) this.getRoot()).getChildren().add(loginForm);
  
    ContestantGraph contestantGraph = new ContestantGraph("Horsey");
    contestantGraph.addSeries("betfair", "Betfair");
    contestantGraph.addDatapointToSeries("betfair", new Pair<>(2, 2));
    contestantGraph.addDatapointToSeries("betfair", new Pair<>(3, 6));
    ((VBox) this.getRoot()).getChildren().add(contestantGraph);
  }
}
