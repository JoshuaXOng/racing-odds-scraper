package racing.odds.server.app.database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class DatabaseBeans {
  private final Log logger = LogFactory.getLog(getClass());

  @Bean
  public MongoClient getMongoClient() {
    String connectionString = System.getenv("DEFAULT_MONGODB_CONNECTION_STRING") == null ? 
      System.getenv("MONGODB_CONNECTION_STRING") : 
      System.getenv("DEFAULT_MONGODB_CONNECTION_STRING");
    if (connectionString == null) 
      logger.error("A MongoDB Client is being created with a `null` connection string.");
    return MongoClients.create(connectionString);
  }
}
