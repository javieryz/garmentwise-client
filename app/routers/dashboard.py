from fastapi import APIRouter, Depends, Query, UploadFile, BackgroundTasks
from database.database import get_db
from database.database import SessionLocal
from services.auth_service import get_current_user
from schemas.user import User
from nlp import model
from services import dashboard_service as dashboard

router = APIRouter()

@router.post("/report/create")
async def create(report_name: str, file: UploadFile, background_tasks: BackgroundTasks,
                  current_user: User=Depends(get_current_user), 
                  db: SessionLocal=Depends(get_db)):
    
    results, metadata, reviews, wordcloud = model.predict(file)

    report_data = {
        "title": report_name,
        "user_id": current_user.id,
        **results['scores'],
        **results['number_of_reviews'],
        "wordcloud": wordcloud
    }
    
    report = dashboard.save_report(report_data=report_data, db=db)
    
    def save_dataset(report):
        dataset = dashboard.save_dataset(report=report, report_metadata=metadata, db=db)
        reviews_categories = dashboard.save_reviews(dataset=dataset, reviews_list=reviews, db=db)
        dashboard.save_review_categories(reviews_categories_list=reviews_categories, db=db)
        print("Finished saving")

    save_dataset(report)

    response = {
        "id": report.id,
        "overall_score": results['scores']['overall_score'],
        "total_reviews": results['number_of_reviews']['total_reviews'],
        "fit_score": results['scores']['fit_score'],
        "fit_reviews": results['number_of_reviews']['fit_reviews'],
        "color_score": results['scores']['color_score'],
        "color_reviews": results['number_of_reviews']['color_reviews'],
        "quality_score": results['scores']['quality_score'],
        "quality_reviews": results['number_of_reviews']['quality_reviews'],
        "title": report_name,
        "user_id": current_user.id,
    }

    return response


@router.get("/report/reports")
async def get_reports(current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    user_id = current_user.id
    reports = dashboard.get_reports_info(user_id=user_id, db=db)
    return reports


@router.get("/report/{report_id}")
async def get_report(report_id: int, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    report = dashboard.get_report(report_id=report_id, db=db)
    return report


@router.get("/report/{report_id}/reviews")
async def get_reviews(report_id: int,
                      page: int = Query(1, gt=0),
                      reviews_per_page: int = Query(10, gt=0, le=50),
                      current_user: User=Depends(get_current_user), 
                      db: SessionLocal = Depends(get_db)):

    offset = (page - 1) * reviews_per_page
    limit = reviews_per_page

    reviews = dashboard.get_reviews(report_id=report_id, offset=offset, limit=limit, db=db)

    return reviews

@router.get("/report/{report_id}/wordcloud")
async def get_wordcloud(report_id: int,
                        current_user: User=Depends(get_current_user), 
                        db: SessionLocal = Depends(get_db)):
    wordcloud = dashboard.get_wordcloud(report_id=report_id, db=db)
    return wordcloud