## Design

### API

#### API methods:

| Method | path                    | description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | /devices                | add a new device                  |
| DELETE | /devices                | remove a device                   |
| GET    | /devices                | get a list of device              |
| POST   | /devices/{id}/feedbacks | post a new feedback on the device |
| PUT    | /devices/{id}           | checkout/checkin device           |



### Model design:

```javascript
{
    _id: Schema.ObjectId, 		// use mongo Id
    device: String,				
    os: String,					
    manufacturer: String,		
    lastCheckedOutDate: Date,	
    lastCheckedOutBy: String,	
    isCheckedOut: Boolean		
}
```







## Future Consideration

- Swagger Validation
- Identity Validation
- security Token management 
- Session logger for each api request