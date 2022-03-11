package racing.odds.server.app.routes;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import racing.odds.server.app.database.models.OddsRecord;
import racing.odds.server.app.database.repositories.OddsRecordRepository;
import racing.odds.server.utilities.MapUtils;

@RestController
@RequestMapping(value="/api/v0/records")
public class RecordsController {
    private MongoOperations mongoOps;
    private OddsRecordRepository repository;
    
    public RecordsController(MongoOperations mongoOps, OddsRecordRepository repository) {
      this.mongoOps = mongoOps;
      this.repository = repository;
    }
    
    @RequestMapping(method=RequestMethod.GET, value="/{id}")
    public OddsRecord getEvent(@PathVariable String id) {
      return this.repository.findOneById(id);
    }
    
    @RequestMapping(method=RequestMethod.GET)
    public List<OddsRecord> getEvents() {
      return this.repository.findAll();
    }
    
    @RequestMapping(method=RequestMethod.POST)
    public OddsRecord createEvent(@RequestBody OddsRecord record) {
      return mongoOps.insert(record);   
    }

    @RequestMapping(method=RequestMethod.PUT, value="/{id}")
    public OddsRecord updateEvent(@PathVariable String id, @RequestBody OddsRecord record) {
      Map<String, Object> processesedEvent = MapUtils.fromObjectWoNulls(record);
      
      Query predicate = Query.query(Criteria.where("_id").is(id));
      Update updateCommands = new Update();
      processesedEvent.forEach(updateCommands::set);
      FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

      return mongoOps.findAndModify(predicate, updateCommands, options, OddsRecord.class);
    }
  
    @RequestMapping(method=RequestMethod.DELETE, value="/{id}")
    public List<OddsRecord> deleteEvent(@PathVariable String id) {
      return mongoOps.findAllAndRemove(Query.query(Criteria.where("id").is(id)), OddsRecord.class);
    }
}