from app.mongoDB_models import Review

class MyDatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'app':
            if model.__name__ == 'Review' or model.__name__ == 'review':
                return 'mongodb'
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'app':
            if model.__name__ == 'Review' or model.__name__ == 'review':
                return 'mongodb'
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'app' and obj2._meta.app_label == 'app':
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'app':
            if model_name == 'Review'or model_name == 'review':
                return db == 'mongodb'
            return db == 'default'
        return None
